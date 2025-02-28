import { getPosts } from '../../db/queries';

export async function GET(request) {
    try {
        console.log("GET");
      const posts = await getPosts();
      return new Response(JSON.stringify(posts), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response("Error occurred", {
        status: 500,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  } 