exports.paginate = (page = 1, limit = 10) => {
  const perPage = Math.max(1, Math.min(parseInt(limit, 10) || 10, 100));
  const pg = Math.max(1, parseInt(page, 10) || 1);
  const skip = (pg - 1) * perPage;
  return { skip, perPage, page: pg };
};

