import React from 'react';

class Tweet extends React.Component {

  render() {
    return (
      <div>
      <div class="boxed">
       <blockquote class="twitter-tweet"> 
         <p lang="tr" dir="ltr"> 
           {this.props.tweet} 
         </p>
       </blockquote> 
       
       <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />  
      </div>

      </div>
    );
  }
}


export default Tweet;

