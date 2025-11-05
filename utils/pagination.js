export const paginate = async ({ model, where = {}, page = 1, limit = 25, orderBy = {}, include = undefined }) => {
    page = Math.max(Number(page) || 1, 1);
    limit = Math.min(Math.max(Number(limit) || 25, 1), 25);

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        model.findMany({
            where,
            skip,
            take: limit,
            orderBy,
            include
        }),
        model.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    return { data, page, limit, total, totalPages };
};
