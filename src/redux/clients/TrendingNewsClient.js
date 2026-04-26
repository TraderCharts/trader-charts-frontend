import ApiClient from "./ApiClient";

export default class TrendingNewsClient extends ApiClient {
    // ---------------------------------- TrendingNews ----------------------------------
    getTrendingNews = () => {
        const promise = this.get(`trendingNews/`);
        return promise;
    };

    getTrendingNew = ({ trendingnewId }) => {
        const promise = this.get(`trendingNews/${trendingnewId}`);
        return promise;
    };
}
