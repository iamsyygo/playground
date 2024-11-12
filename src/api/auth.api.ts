import fetcher from '@/utils/fetcher';

export function refreshToken() {
  return fetcher.get();
}
