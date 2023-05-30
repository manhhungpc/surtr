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

export const paginate = (data: any, total: number, limit: number, current_page: number) => {
    const from = (current_page - 1) * limit + 1;
    const to = current_page * limit >= total ? total : current_page * limit;

    return {
        data: success(data),
        pagination: {
            page: current_page,
            per_page: limit,
            from: from,
            to: to,
            total: total,
        },
    };
};
