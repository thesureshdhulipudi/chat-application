import './DropDown.css';
const Dropdown = (props) => {  
    const { dropDownList } = props;
    const selectedItem = (item) =>{
        props.selectedItem(item);
    }
    return(
        <div className="chat-dropdown-menu">
            {
                dropDownList.map((item,index) => 
                    <div className="chat-dropdown-option" key={index} onClick={e=>selectedItem(item)}> {item} </div>
                )
            }
        </div>
    )
}
export default Dropdown;