import { Component } from "react";
// import { COMMENTS } from "../shared/comments";
import { ListItem,Card } from "react-native-elements";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native";
class Test1 extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            comments :COMMENTS
        }
    }

    render()
        {
            return(
                <RenderCommentItem1 cmt={this.state.comments} />
            );
        }
    
}


class RenderCommentItem1 extends Component{
   render()
   {
    return (
        <Card>
            <FlatList data={this.props.cmt}
             renderItem={({ item, index }) => this.renderCommentItem(item, index)}
             keyExtractor={(item) => item.id.toString()} 
            />
        </Card>
    );
   }
    renderCommentItem(item,index)
    {
        return(
            <ScrollView>
                <ListItem key={index}>
                <Text>{item.author}</Text>
                <Text>{item.id}</Text>
                <Text>{item.dishId}</Text>
                <Text>{item.rating}</Text>
                <Text>{item.comment}</Text>
            </ListItem>
            </ScrollView>
            
        );
    }
}

export default Test1;