import React from 'react';
import axios from 'axios';
const url=`https://nuvi-challenge.herokuapp.com/activities`;

export default class ApiComponent extends React.Component {
	
	 constructor(props) {
    super(props);
   this.state={
      Active_data:''
   }
    this.getActivities=this.getActivities.bind(this)
  }


getActivities(){
    axios.get(url)
    .then(res => {
     
     console.log(res.data.slice(0, 50))

      const {status, data} = res;
      console.log(data)
      
      if (status === 200) {
          this.setState({ Active_data : data.slice(0, 50)})
      }

    }).catch(err => console.log(err))

  }

  componentWillMount() {
    this.getActivities()
  }  


	render () {

		const {Active_data} = this.state
    	console.log(this.state.Active_data+'render')

		return (
			<div>
				
				<ul>
		              { Active_data && Active_data.length && Active_data.map((elem,index) =>              
		             <li key={index}>
			             <div>
			             	{elem.actor_username}
			             	<br/>
			             	 <a target="_blank" href={elem.actor_url}>
                              <img className="activity-avator" height={45} width={45} src={elem.actor_avator || '/img/default.png'} />
                            </a>
			             </div>
		             </li>
			              )}
			          </ul>

			</div>
		)
	}
}