import type { APIRoute } from 'astro';
import recentIssues from '../../data/recentIssues.json';

export const GET: APIRoute = () =>
  new Response(JSON.stringify(recentIssues), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
