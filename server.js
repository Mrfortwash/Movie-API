const express = require ('express'),
        app = express(),  
        bodyParser = require('body-parser'),
       uuid = require ('uuid');
app.use (bodyParser.json());

let users = [
    {
        id:1,
        name:'Buck',
        favoriteMovies: []
    },
    {
        id: 2,
        name: 'Shots',
        favoriteMovies: ['Hereditary']
    }

]


let movies = [
    {
      title: 'Suspiria',
      year: '1977',
      rating: 'R',
      genre: {
        'Name':'Thriller',
        'Description': 'suspicious dope man taking place in the late 70s goes on a rampage like you would never believe'},
      director: {
        'Name':'Ben Gordon',
        'Bio': "Ben was born March 3, 1970 in Fort Washington, Md. Growing up, Ben always knew he wanted to be a director. He was very artistic, love classic movies and anything related to art"
       
      }
    
    },
    {
      title: 'A Nightmare on Elm Street',
      year: 1984,
      rating: 'R'
    },
    {
      title: 'Get Out',
      year: 2017,
      rating: 'R',
    },
    {
      title: 'Hereditary',
      year: 2018,
      rating: 'R',
    },
    {
      title: 'It',
      year: 2017,
      rating: 'R',
    },
    {
      title: 'Midsommar',
      year: 2019,
      rating: 'R',
    },
    {
      title: 'Carrie',
      year: 1976,
      rating: 'R',
    },
    {
      title:'The Witches',
      year: 1990,
      rating: 'PG',
    },
    {
      title:'Halloween',
      year: 1978,
      rating: 'R',
    },
    {
      title:'Little Shop of Horrors',
      year: 1986,
      rating: 'PG-13',
    },
  ];

  //CREATE
  app.post('/users', (req, res) => {
      const newUser = req.body;

      if (newUser.name) {
        newUser.id = uuid.v4 ();
        users.push (newUser)
        res.status (201).json(newUser)
      } else {
        res.status (400).send ('users need names')
      }
  })

  //  CREATE
  app.post('/users/:id/:movieTitle', (req, res) => {
    const {id, movieTitle} = req.params;
    

    let user = users.find(user => user.id ==id);

    if (user) {
      user.favoriteMovies.push(movieTitle);
      res.status(200).send(`${movieTitle} has been added to user ${id}'s' array`) ;;
    } else {
      res.status(400).send ('no such user')
    }
})

//  DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const {id, movieTitle} = req.params;
  

  let user = users.find(user => user.id ==id);

  if (user) {
    user.favoriteMovies= user.favoriteMovies.filter(title => title !==movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s' array`) ;;
  } else {
    res.status(400).send ('no such user')
  }
})

//  DELETE
app.delete('/users/:id', (req, res) => {
  const {id,} = req.params;
  

  let user = users.find(user => user.id ==id);

  if (user) {
    users = users.filter(user => user.id !=id);
    res.status(200).send(`user ${id} has been deleted`) ;;
  } else {
    res.status(400).send ('no such user')
  }
})

  //UPDATE
  app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id ==id);

    if (user) {
      user.name = updatedUser.name;
      res.status(200).json(user);
    } else {
      res.status(400).send ('no such user')
    }
})


  //READ
  app.get ('/movies', (req, res)=> {
    res.status (200).json(movies)
  })

  //READ
  app.get ('/movies/:title', (req, res)=> {
    
    const {title} = req.params;
    const movie = movies.find(movie => movie.title === title);

    if (movie) {
      res. status (200). json (movie);
    } else {
      res.status (400). send ('no such movie')
    }
  })

    //READ
    app.get ('/movies/genre/:genreName', (req, res)=> {
    
      const {genreName} = req.params;
      const genre = movies.find(movie => movie.genre.Name === genreName).genre;
  
      if (genre) {
        res.status (200).json (genre);
      } else {
        res.status (400). send ('no such genre')
      }
    })

    //READ
    app.get ('/movies/director/:directorName', (req, res)=> {
    
      const {directorName} = req.params;
      const director = movies.find(movie => movie.director.Name === directorName).director;
  
      if (director) {
        res.status (200).json (director);
      } else {
        res.status (400). send ('no such director')
      }
    })
  
  

app.listen(8080, ()=> console.log ("listening on 8080"))