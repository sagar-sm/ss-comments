var $ = require('jquery-browserify');
var React = require('react/addons');
var foundation = require('./foundation.min.js');
var moment = require('moment');

//get from server on page load in actual app
var data = require('../data.json');

$(document).foundation();

window.onload = function(){
  // console.log(data);
}

var Comment = React.createClass({
  render: function() {
    return (
      <li key={this.props.content.id} className='comment'>
        <div className='user row'>
          <div className='image-block small-1 columns'>
            <img src={this.props.content.user.img_src}></img>
          </div>
          <div className='info-block small-11 columns'>
            <h3 className='user-name'>{this.props.content.user.full_name}</h3>
            <h4 className='user-title'>{this.props.content.user.title}</h4>
          </div>
        </div>
        <div className='text row'>
          <div className='description small-offset-1 columns'>{this.props.content.comment.description}</div>
        </div>
        <div className='meta row'>
          <div className='date-posted small-offset-1 columns'>{this.props.content.comment.date_posted}</div>
        </div>
      </li>
      );
  }
});

var CommentList = React.createClass({
  render: function() {
    var createItem = function(content) {
      return (<Comment content={content}></Comment>);
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});

var CommentsApp = React.createClass({
  getInitialState: function() {
    return {items: data, text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    function getUser(){
      //use this function to fetch session details about logged in user
      return {
        "id": "4",
        "img_src": "/images/user-img-4.png",
        "full_name": "Tom Riddle",
        "title": "Wizard"
      };
    }
    var item = {
      id: this.state.items.length+1,
      user: getUser(),
      comment: {
        description: this.state.text,
        date_posted: moment().format('ddd MMM Do')
      }
    }
    
    this.state.items.unshift(item);
    var nextText = '';
    this.setState({text: nextText});
  },
  render: function() {
    return (
      <div>
        <h2>Leave Feedback</h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Post' + (this.state.items.length + 1)}</button>
        </form>
        <CommentList items={this.state.items} />
      </div>
    );
  }
});

React.render(<CommentsApp/>, document.querySelector('#comments'));

