import { getItemsById } from '../../db/queries';

export async function GET(request) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'No id provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const items = await getItemsById('content_listen_fill', 'content_id', id);
    return new Response(JSON.stringify(items), {
      headers: { 'Content-Type': 'application/json' },
    }); 
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}