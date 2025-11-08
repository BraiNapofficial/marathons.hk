const { createClient } = require('@supabase/supabase-js');
const { default: fetch } = require('node-fetch');
require('dotenv').config({ path: '.env.local' });

// Hosts whose meta descriptions should be ignored (social profiles, aggregators, etc.)
const blockedDescriptionHosts = new Set([
  'instagram.com',
  'www.instagram.com',
  'facebook.com',
  'www.facebook.com',
  'm.facebook.com',
  'x.com',
  'twitter.com',
  'www.twitter.com',
  'youtube.com',
  'www.youtube.com',
  'youtu.be',
  'linktr.ee',
  'www.linktr.ee'
]);

// Known organizer mappings for specific domains
const organizerDomainMap = {
  'actionpanda3ballrun.com': 'Action Panda',
  'hyrox.com': 'HYROX',
  'bluemountainsports.hk': 'Blue Mountain Sports',
  'avohk.org': 'AVOHK',
  'chunghingwrc.com': 'Chung Hing WRC',
  'life-fever.com': 'Life Fever',
  'noracenogoal.com': 'No Race No Goal',
  'sdhhk.org': 'Southern District',
  'playaroundhk.com': 'Play Around',
  'wildtrekhk.com': 'Wild Trek',
  'luacharityrun2025.sportsoho.com': 'LUA Charity Run',
  'psrun2025.sportsoho.com': 'Sportsoho',
  'victoria162.hk': 'Victoria 162',
  'motorrun2025': 'Motor Run',
  'actionasiaevents.com': 'Action Asia Events',
  'outwardbound.org.hk': 'Outward Bound',
  'dark45.com': 'Dark 45',
  'hkaaa.com': 'Hong Kong AAA',
  'raleighwilsontrail.hk': 'Raleigh Wilson',
  'hongchi.org.hk': 'Hong Chi',
  'fishnsheep50.com': 'Fish N Sheep',
  'thetrailhub.com': 'The Trail Hub',
  'rundaevents.com': 'RunDa Events',
  'sowers.hk': 'Sowers',
  'translantau.utmb.world': 'TransLantau',
  'mizunohkrun.com': 'Mizuno Hong Kong',
  'pinkrun.hk': 'Pink Run',
  'streetathon.com': 'Hong Kong Streetathon',
  'oxfamtrailwalker.org.hk': 'Oxfam Trailwalker',
  'sephk.com': 'SEP',
  'salomon100.com': 'Salomon Hong Kong',
  'hkmarathon.com': 'Standard Chartered Hong Kong Marathon',
  'hike.greenpower.org.hk': 'Green Power',
  'run2gather.com': 'Run2Gather',
  'the9dragons.asia': 'The 9 Dragons',
  'hkmarathonpro.com': 'Hong Kong Marathon Pro',
  'in.njuko.com': 'Njuko',
  'register.sowers.hk': 'Sowers'
};

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function getHostFromUrl(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

function isDescriptionBlocked(url) {
  const host = getHostFromUrl(url);
  return host ? blockedDescriptionHosts.has(host) : false;
}

function extractDescription(html) {
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/i);
  if (descMatch) return descMatch[1];

  const ogMatch = html.match(/<meta property="og:description" content="([^"]+)"/i);
  if (ogMatch) return ogMatch[1];

  const twitterMatch = html.match(/<meta name="twitter:description" content="([^"]+)"/i);
  if (twitterMatch) return twitterMatch[1];

  return null;
}

function formatName(segment) {
  if (!segment) return null;
  let cleaned = segment.trim();
  cleaned = cleaned.replace(/[_-]+/g, ' ');
  cleaned = cleaned.replace(/([a-z])([A-Z])/g, '$1 $2');
  cleaned = cleaned.replace(/(\d+)/g, ' $1 ');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  cleaned = cleaned.replace(/hk$/i, ' HK');
  cleaned = cleaned.replace(/\b(hk|cn|tw|us|uk)\b/gi, str => str.toUpperCase());

  if (!cleaned) return null;

  return cleaned
    .split(' ')
    .filter(Boolean)
    .map(word => {
      if (word.length <= 2 && word === word.toUpperCase()) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function cleanOrganizer(raw) {
  if (!raw) return null;
  let s = raw.replace(/\s+/g, ' ').trim();
  s = s.replace(/(we run|官方網站|線上跑|立即報名|buy tickets|official site|隨時隨地進行)/ig, '').trim();
  s = s.replace(/\s*(-|–|—)\s*.*$/, '').trim();
  s = s.replace(/[^\w\s\u4e00-\u9fff&.-]/g, '').trim();

  const formatted = formatName(s);
  if (!formatted || formatted.length < 3) return null;
  return formatted;
}

function deriveNameFromSocialPath(url) {
  try {
    const { pathname } = new URL(url);
    const segment = pathname.replace(/^\//, '').split('/').find(Boolean);
    if (!segment) return null;
    return formatName(segment);
  } catch {
    return null;
  }
}

function fallbackOrganizer(event) {
  const slugName = formatName((event.english_slug_base || '').replace(/-/g, ' '));
  if (slugName && slugName.length >= 3) return slugName;
  const domainName = deriveOrganizerFromDomain(event.link);
  if (domainName && domainName.length >= 3) return domainName;
  return '足•包 marathons.hk';
}

function deriveOrganizerFromDomain(url) {
  const host = getHostFromUrl(url);
  if (!host) return null;

  if (organizerDomainMap[host]) {
    return organizerDomainMap[host];
  }

  if (blockedDescriptionHosts.has(host)) {
    const socialName = deriveNameFromSocialPath(url);
    if (socialName) return socialName;
  }

  const parts = host.split('.');
  let candidate = parts.length > 1 ? parts[parts.length - 2] : parts[0];
  if (candidate.length < 3 && parts.length > 2) {
    candidate = parts[parts.length - 3];
  }

  return formatName(candidate);
}

function extractOrganizer(html, url) {
  const authorMatch = html.match(/<meta name="author" content="([^"]+)"/i);
  if (authorMatch) {
    const cleaned = cleanOrganizer(authorMatch[1]);
    if (cleaned) return cleaned;
  }

  const ogMatch = html.match(/<meta property="og:site_name" content="([^"]+)"/i);
  if (ogMatch) {
    const cleaned = cleanOrganizer(ogMatch[1]);
    if (cleaned) return cleaned;
  }

  const titleMatch = html.match(/<title>[^-]+- ([^-<]+)/i);
  if (titleMatch) {
    const cleaned = cleanOrganizer(titleMatch[1]);
    if (cleaned) return cleaned;
  }

  return deriveOrganizerFromDomain(url);
}

function buildFallbackDescription(event) {
  const categoryMap = {
    '越野': '越野跑',
    '路跑': '路跑賽',
    'HYROX': '健身越野賽',
    '樓梯': '爬樓賽'
  };

  const category = categoryMap[event.event_category] || event.event_category || '跑步活動';
  const distance = event.distance || '多種距離';
  const location = event.location || '香港';
  const date = event.event_date || '日期待定';

  return `${event.event_name} - ${category}，距離${distance}，地點${location}，日期${date}。立即報名參加這個精彩的跑步活動！`;
}

function looksLikeSocialBio(text) {
  if (!text) return false;
  return /(followers|posts|instagram|facebook|twitter|youtube)/i.test(text);
}

async function fetchEventData() {
  console.log('Starting to fetch event data...');

  const { data: events, error } = await supabase
    .from('marathons.hk')
    .select('id, event_name, link, event_description, organizer_name, event_category, distance, location, event_date, english_slug_base');

  if (error) {
    console.error('Error fetching events:', error);
    return;
  }

  console.log(`Found ${events.length} events to process`);

  for (const event of events) {
    if (!event.link) {
      console.log(`Skipping ${event.event_name} - no URL`);
      continue;
    }

    const hostIsBlocked = isDescriptionBlocked(event.link);
    try {
      console.log(`Processing: ${event.event_name}`);

      const response = await fetch(event.link, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; marathons.hk-bot/1.0)'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();

      let description;
      if (hostIsBlocked) {
        description = buildFallbackDescription(event);
      } else {
        description = extractDescription(html) || buildFallbackDescription(event);
      }

      if (!description) {
        description = buildFallbackDescription(event);
      }

      let organizer = extractOrganizer(html, event.link);
      if (!organizer) {
        organizer = fallbackOrganizer(event);
      }

      const updateData = {
        event_description: description,
        organizer_name: organizer
      };

      await supabase
        .from('marathons.hk')
        .update(updateData)
        .eq('id', event.id);

      console.log(`✓ Updated: ${event.event_name}`);
      console.log(`  Description: ${description ? 'SET' : 'FALLBACK'}`);
      console.log(`  Organizer: ${organizer || 'NOT FOUND'}`);

      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (err) {
      console.error(`✗ Failed: ${event.event_name} - ${err.message}`);

      const fallbackData = {
        event_description: buildFallbackDescription(event),
        organizer_name: fallbackOrganizer(event)
      };

      await supabase
        .from('marathons.hk')
        .update(fallbackData)
        .eq('id', event.id);

      console.log(`✓ Fallback written: ${event.event_name}`);
      console.log(`  Description: FALLBACK`);
      console.log(`  Organizer: ${fallbackData.organizer_name}`);
    }
  }

  console.log('Done!');
}

fetchEventData();