import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { typingMessagesStop } from '../../Store/Action/ChatsAction';
import './Wave.css';
const Wave = (props) => {
    const { name, typing, showName,userNameClass,waveClass } = props;
    const dispatch = useDispatch();
    useEffect(()=>{
        setTimeout(
            () => dispatch(typingMessagesStop(typing)), 
            10000
          );
    })
    return (
        <div>
            <div className={userNameClass}>
                {showName
                    ? name + " is typing"
                    : " typing"}
            </div>

            <div id={waveClass}>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>

    )
}
export default Wave;