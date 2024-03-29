import axios from 'axios';
// const LOGIN_USER_KEY = 'WD_FORUM_LOGIN_USER_KEY';

var baseURL;
if (process.env.REACT_APP_ENVIRONMENT && process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION') {
    baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
    baseURL = 'http://127.0.0.1:8000', "https://tastybackend.apoorvasmr.repl.co/";
}
// baseURL = 'https://backend-tt.herokuapp.com/';
const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Add requireToken: true in request config, for API that required Authorization token
 */
// api.interceptors.request.use(
//     config => {
//         if (config.requireToken && localStorage.getItem(LOGIN_USER_KEY)) {
//             config.headers.common['Authorization'] = JSON.parse(localStorage.getItem(LOGIN_USER_KEY)).token;
//         }

//         return config;
//     },
//     err => {
//         console.error(err);
//     }
// );

export default class API {
    //////////// POST/////////////////
    getPosts = params => {
        return api
            .get('/posts/', { params })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    };
    addPost = postBody => {
        const formData = new FormData();

        for (const key in postBody) {
            formData.append(key, postBody[key]);
        }

        return api
            .post('/posts/add/', formData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    };
    deletePost = id => {
        return api.delete(`/posts/delete/${id}/`).catch(error => {
            throw new Error(error);
        });
    };
    ///////////////ITEM//////////////

    getItems = async category => {
        let url = '/items/';
        if (category) {
            url += '?category=' + category;
        }
        const items = await api
            .get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return items;
    };
    ///////////////REVIEW//////////////

    getReviews = async item_id => {
        let url = '/reviews?item_id=' + item_id;
        const reviews = await api
            .get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return reviews;
    };
    ///////////////WRITE REVIEW//////////////

    writeReview = async (item_id, name, body, like_count) => {
        const formData = new FormData();
        formData.append("item", item_id);
        formData.append("name", name);
        formData.append("body", body);
        formData.append("like_count", like_count);
        const savedReview = await api
          .post("/reviews/add", formData)
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            throw new Error(error);
          });
        return savedReview;
      };
    }

