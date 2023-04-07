export function createNameFile(){
  return crypto.randomUUID();
}

export default async function createFolder() {
  const folder = crypto.randomUUID();
  await Deno.mkdir(`./download/${folder}`, { recursive: true });
  return folder;
}
