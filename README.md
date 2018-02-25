# Transactions / Translations

Given a pantograph, will tell you about your inner self. Created in collaboration with Dana Potter for the exhibit [Transactions / Translations](https://www.facebook.com/events/170903523554293/) at 1010 Gallery in Knoxville, TN, in March, 2018.

## Getting Started

I can't imagine anyone will want to run this, but in case you do, here's how you get going:

### Installing

```
# Install ruby and bundler
bundle install
rails s
```

Then, visit the server and upload a photo! You should then see a link to your generated personality profile.

Alter environment variables in the `.env` file.

## Running the tests

There's minimal testing in this project, but there are full-flow integration specs. Here's the command to get them running:
 
```
rspec spec
```

## Deployment

When deploying, be sure to set the `ROOT_URL` environment variable to your host root URL (e.g. 'https://chartsock.com).


## License

This project is licensed under the MIT License.

## Acknowledgments

* Dana Potter for her thoughts and direction
* Ashlee Mays for getting me involved
* Aaand, heavy thanks to this excellent [D3 pie chart tutorial](http://zeroviscosity.com/d3-js-step-by-step/step-0-intro)
