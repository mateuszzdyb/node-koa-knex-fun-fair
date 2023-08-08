export default function validatePagination(page: string | string[] | undefined) {
  const offset = page ? Number(page) : 0;
  if (Number.isNaN(offset) || !Number.isInteger(offset)) {
    throw new Error();
  }
}
