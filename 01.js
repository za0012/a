const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzcxNjA2ZDhjZjFhNzExMGM3NDA4NDgyMzRkYTI5OCIsIm5iZiI6MTcyMTg5NTIxOS42Mzc4OTQsInN1YiI6IjY2OWRhNDQxZjE3YTkxMjZkMjRjMzE2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ee981DIwG9c7sMsfzEQ20JrbYWmpJyD8_TcWcO0NXYM',
    },
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1', options)
    .then((response) => response.json()) //읽어온 데이터를 json으로 변환
    .then((response) => {
        if (typeof window !== 'object') return;
        const movieLists = response['results'];
        const section = document.querySelector('section');
        section.className = 'movies';
        const divTitle = document.getElementsByClassName('titleVote');

        movieLists.forEach((movieList) => {
            let movieArticle = document.createElement('article');
            movieArticle.className = 'modal_btn_new';

            let movieDiv = document.createElement('div');

            let moviePoster = `https://image.tmdb.org/t/p/w500/${movieList.poster_path}`;

            let movieTitle = movieList.title;
            let movieOverview = movieList.overview;
            let movieVoteAverage = movieList.vote_average;

            let div = movieDiv;
            movieDiv.className = 'myClass';

            let article = document.createElement('article');
            let img = document.createElement('img');

            /**/
            let h2 = document.createElement('h2');
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');

            img.src = moviePoster;
            h2.textContent = movieTitle;
            p1.textContent = movieOverview;
            p2.textContent = movieVoteAverage;

            /* 이미지, 제목, 별점 */
            movieArticle.appendChild(img);
            movieDiv.appendChild(h2);
            movieDiv.appendChild(p2);
            movieDiv.appendChild(p1);
            movieArticle.appendChild(movieDiv);
            section.appendChild(movieArticle);
        });
        /* 검색  */
        const searchInput = document.getElementById('input');
        function showSearchResult() {
            section.innerHTML = '';

            console.log(movieLists);
            let searchWord = searchInput.value;
            newDataList = movieLists.filter((object) => {
                return object.title.toLowerCase().includes(searchWord);
            });
            console.log(newDataList);
            console.log('실행이 됐습니까????????????');
            return newDataList.forEach((searchMovie) => {
                console.log('실행이 됐습니까????????????');
                let movieArticle = document.createElement('article');
                movieArticle.className = 'modal_btn';

                let movieDiv = document.createElement('div');

                let moviePoster = `https://image.tmdb.org/t/p/w500/${searchMovie.poster_path}`;

                let movieTitle = searchMovie.title;
                let movieOverview = searchMovie.overview;
                let movieVoteAverage = searchMovie.vote_average;
                console.log('그런듯!!!!!!!!!!!!');
                let div = movieDiv;
                movieDiv.className = 'myClass';

                let article = document.createElement('article');
                let img = document.createElement('img');

                /**/
                let h2 = document.createElement('h2');
                let p1 = document.createElement('p');
                let p2 = document.createElement('p');

                img.src = moviePoster;
                h2.textContent = movieTitle;
                p1.textContent = movieOverview;
                p2.textContent = movieVoteAverage;

                /* 이미지, 제목, 별점 */
                movieArticle.appendChild(img);
                movieDiv.appendChild(h2);
                movieDiv.appendChild(p2);
                movieDiv.appendChild(p1);
                movieArticle.appendChild(movieDiv);
                section.appendChild(movieArticle);
            });
        }

        const enterKey = (e) => {
            if (e.code === 'Enter') {
                showSearchResult();
            }
        };

        searchInput.addEventListener('keypress', (event) => {
            enterKey(event);
        });
    })
    .catch((err) => console.error(err));

/*
	받아온 데이터 result 화면에 list로
	서버에서 받아온 동적인 데이터 
	부모 컨테이너만 받아오기

	반복문 for Eaxh로 돔조작 크리에이트 엘리먼트

	구글에 tmdb api image PaymentResponse공식문서에 나와있음
*/
