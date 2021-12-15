const axiosInstance = require('../middleware/udemy-check');



//  Get all Posts handler
exports.getCourses = async(req, res, next) => {
    try {
        const pageSize = +req.query.page_size;
        const currentPage = +req.query.page;
        const response = await axiosInstance.get(`courses/?page=${currentPage}&page_size=${pageSize}`);
        // console.log(response.data);
        res.status(200).json({ courses: response.data.results, courseCount: response.data.count });

    } catch (error) {
        res.status(500).json({message: 'ERROR: Error Occured!'});
    }
}