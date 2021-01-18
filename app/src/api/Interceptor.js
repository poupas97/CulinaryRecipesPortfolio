export async function responseInterceptor(result = {}) {
  const data = await result.json();
  if (result.status == 500) throw new Error(data.message);
  return data || null;
}
