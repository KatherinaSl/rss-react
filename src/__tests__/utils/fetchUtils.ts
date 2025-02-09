export default function prepareFetchResponse<Type>(
  status: number,
  json?: Type
): Response {
  return {
    ok: status === 200,
    status,
    statusText: status ? 'OK' : 'NOT_OK',
    json: async () => json,
    text: vi.fn().mockResolvedValue(''),
    formData: vi.fn().mockResolvedValue(new FormData()),
    body: null,
    bodyUsed: false,
    arrayBuffer: vi.fn(),
    blob: vi.fn(),
    clone: vi.fn().mockReturnValue(json),
    headers: new Headers(),
    redirected: false,
    type: 'basic',
    url: '',
    bytes: vi.fn().mockResolvedValue(new Uint8Array()),
  };
}
