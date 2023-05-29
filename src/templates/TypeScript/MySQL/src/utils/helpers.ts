import moment from 'moment';

export const success = (data: any, message?: string) => {
    return {
        success: true,
        status: 200,
        data: formatData(data),
        message: message,
    };
};

export const error = (code: number, error: any) => {
    return {
        success: false,
        status: code,
        error: error,
    };
};

const formatData = (data: any) => {
    const dateColumns = ['created_at', 'updated_at'];
    data['id'] = data['_id'].toString();

    for (let dateType of dateColumns) {
        if (data[dateType] !== null) data[dateType] = moment(data[dateType]).format('DD/MM/YYYY, HH:mm:ss');
    }

    return data;
};

export const paginate = (data: any, total: number, limit: number, page: number) => {
    const from = (page - 1) * limit + 1;
    const to = page * limit >= total ? total : page * limit;

    return {
        data: success(data),
        pagination: {
            page: page,
            per_page: limit,
            from: from,
            to: to,
            total: total,
        },
    };
};
