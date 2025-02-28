export async function GET(request) {
  try {
    return new Response("hello", {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    return new Response("Error occurred", {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
} 