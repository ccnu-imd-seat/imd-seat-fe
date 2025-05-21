import './index.scss';
import { View, Text, Button} from '@tarojs/components';


const RecordCard = (props:
  {
  condition: boolean;
  date: string;
  location: string;
  status: string;
}
) => {
  const { condition, date, location, status } = props;

  return (
    <>
      {condition ? (
        <View className="record-card">
          <View className="record-date">{date}</View>
          <View className="record-detail">
            <Text className="record-location">{location}</Text>
            <Text className="record-status">{status}</Text>
            <Button className='record-btn'>取消预约</Button>
          </View>
        </View>
      ) : (
        <View className="record-card">
          <View className="record-date">{date}</View>
          <View className="record-detail">
            <Text className="record-location">{location}</Text>
            <Text style={{width:"90px"}}></Text>
            <Text className="record-tap">违约</Text>
          </View>
        </View>
      )}
    </>
  );
}

export default RecordCard;
