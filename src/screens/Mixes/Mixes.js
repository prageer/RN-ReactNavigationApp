import React, { Component } from 'react';
import DetailEvent from "./DetailEvent";
import CreateEvent from "./CreateEvent";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../modules/event';

import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
  Item,
  Input
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image } from 'react-native';

import ReactNative from 'react-native';
const {  
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput
} = ReactNative;

/**
 * Mixes component
 */

function renderHeader(navigation) {
	const isSearch = navigation.state.params && navigation.state.params.isSearch ? true : false;
	const eventCount = navigation.state.params && navigation.state.params.eventCount ? navigation.state.params.eventCount : 0;

	return (
		isSearch ?
			<Header searchBar rounded style={{backgroundColor: 'black'}}>
				<Item>
			    	<Icon name="ios-search" />
			        <Input placeholder="Search" onChangeText={(text)=>{
			        	navigation.state.params.handleSearchStr(text);
			        }} />
			        <Icon name="md-briefcase" />
			        <Button style={{backgroundColor: 'black'}} onPress={()=>{
			        	navigation.state.params.goSearch();
			        	navigation.state.params.handleEdit();
			        }}>
	            		<Text>Search</Text>
	          		</Button>
			    </Item>
			</Header>
		:
			<Header style={{height: 85, backgroundColor: 'black'}}>
				<Left style={{flex: 1}}>
					<Button style={{position: 'absolute', top: -40}} transparent onPress={() => navigation.navigate("DrawerOpen")}>
					 	<Icon name="menu" />
					</Button>
				</Left>
				<Body style={{flexDirection: 'column', alignItems: 'center'}}>
					<Title style={{marginTop: 5}}>Events</Title>
					<Text style={{color: 'gray', fontSize: 13}}>{eventCount} events found</Text>
					<Text style={{color: 'white', marginTop: 10}}>Place holder Text</Text>
				</Body>
				<Right>
					<Button style={{position: 'absolute', top: -40}} transparent onPress={() => {
						navigation.state.params.handleEdit();
					}}>
					  <Icon name="search" />
					</Button>
				</Right>
			</Header>
	);
}


class Mixes extends Component {

	static navigationOptions = ({ navigation }) => ({		
		header: (
			renderHeader(navigation)
		)
	});	

	constructor(props) {
		super(props);
		this.searchString = '';
		this.state = {
			sString: ''
		}
	}
	
	componentWillMount() {
        this.props.navigation.setParams({
            isSearch: false,
            handleEdit: this.handleEdit.bind(this),
            handleSearchStr: this.handleSearchStr.bind(this),
            goSearch: this.goSearch.bind(this),
            eventCount: this.props.events.length
        });
    }

    handleEdit() {
        this.props.navigation.setParams({
            isSearch: !this.props.navigation.state.params.isSearch,
        });
    }

    handleSearchStr(val) {
    	this.searchString = val;
    }

    goSearch() {
    	this.setState({
    		sString : this.searchString
    	});
    	this.searchString = '';
    }
    
  /**
   * Render Mixes
   * @return {jsxresult} result in jsx format
   */
	render() {
		const {sString} = this.state;
		const {events} = this.props;
		const listData = events;

		let eventList = listData.map((item, index)=>{
			if (sString =='' || item.event_name.indexOf(sString) != -1) {
				return (	          				
  				<Row style={[styles.listItem, styles.lastItem]} key={index}>
        			<TouchableOpacity style={{flex:1}} onPress={() => {
        				this.setState({
        					sString: ''
        				});
        				this.props.navigation.navigate("DetailEvent", { 
    						detailTitle: item.event_name,
    						detailTime: item.date,
    						detailLocation: item.location,
    						detailImage: item.image
    					});
        			}}>
        				<View style={{flex:1, flexDirection: 'row'}}>
							<Col size={67}>
								<Image resizeMode="stretch" style={{flex:1, height: undefined, width: undefined }} source={{uri: item.image}}>
									<View style={{flex:1, justifyContent: 'center', position: 'absolute', bottom: 0, padding: 10, width: '100%', backgroundColor: 'rgba(0,0,0,0.7)', opacity: 0.2}}>
										<Text style={{fontSize: 20, color: 'white'}}>{item.event_name}</Text>
										<Text style={{fontSize: 13, color: 'white', marginTop:10}}>{`${item.date} - ${item.location}`}</Text>
									</View>
									<View style={{flex:1, justifyContent: 'center', position: 'absolute', bottom: 0, padding: 10, width: '100%'}}>
										<Text style={{fontSize: 20, color: 'white'}}>{item.event_name}</Text>
										<Text style={{fontSize: 13, color: 'white', marginTop:10}}>{`${item.date} - ${item.location}`}</Text>
									</View>
								</Image>
							</Col>
						</View>
					</TouchableOpacity>
        		</Row>
        	);
			} else {
				return null;
			}
		});

		let eventCount = 0;
		eventList.map((item, index)=>{
			if( item != null)
				eventCount++;
		});

		return (
			<Container style={{backgroundColor:'white'}}>
          		<Grid>
          			{
	          			eventList
            		}
            		{
            			eventCount == 0 &&
            			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            				<Text style={{fontSize: 20}}>No Events</Text>
            			</View>
            		}
          		</Grid>
          		<View style={{position: 'absolute', right: 20, bottom: 20}}>
          			<Icon name='ios-add-circle' style={{fontSize: 60}} onPress={()=>{
          				this.setState({
          					sString: ''
          				});
          				this.props.navigation.navigate("CreateEvent");
          			}} />
          		</View>
		    </Container>
		);
	}
}


var styles = StyleSheet.create({
	listItem: {
		borderWidth: 1,
		borderColor: '#ededee',
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0
	}
});


export default connect(
  (state) => ({
    events: state.event.events
  }),
  (dispatch) => ({
    eventActions: bindActionCreators(eventActions, dispatch)
  })
)(Mixes);