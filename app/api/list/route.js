import { getAllItems, getItemsById } from '../../db/queries';

export async function GET(request) {
  try {
    const id = request.nextUrl.searchParams.get('id');
    console.log("API id", id);
    
    if (id) {
      const items = await getItemsById('content', 'list_id', id);
      return new Response(JSON.stringify(items), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const lists = await getAllItems('list');
    return new Response(JSON.stringify(lists), {
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