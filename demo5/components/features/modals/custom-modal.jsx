import React, {useState} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Qty from '~/components/features/qty';
import variant from '~/store/variant';
import { canAddToCart } from '~/utils';
import { actions as cartAction } from '~/store/cart';
import { connect, useSelector } from 'react-redux';

function CustomModal({onOpen,productStock, product,selectedColor,selectedPrice,selectedColorName,cartList,addToCart}) {
    // console.log(productStock, product,selectedColor,selectedPrice,selectedColorName)
    // console.log(product)
    const [ qty, setQty ] = useState( 1 );
    const [bust, setBust] = useState('');
    const [hip, setHip] = useState('');
    const [waist, setWaist] = useState('');
    const [remarks, setRemarks] = useState('');
    const [cartDisabled, setCartDisabled] = useState(false);

    function Reset(){
        setBust('');
        setHip('');
        setWaist('');
        setRemarks('');
        setQty(1);
    }

    function onChangeBust(e){
        setBust(e.target.value)
    }

    function onChangeHip(e){
        setHip(e.target.value)
    }

    function onChangeWaist(e){
        setWaist(e.target.value)
    }

    function onChangeRemark(e){
        setRemarks(e.target.value)
    }

    function onChangeQty ( current ) {
        setQty( current );
    }

    function onCartClick(e, index=0){
        // e.preventDefault();
        if(e.currentTarget.classList.contains('btn-disabled')){
            setCartDisabled(true);
            setTimeout(() => {
                setCartDisabled(false);
            },3000);
            return;
        }
        console.log("onCart")
        let newProduct={...product}
        console.log(product)
        let variantColorSlug = "", sizeAbbreviation = ""
        if(selectedColor && selectedColorName){
            variantColorSlug = `${product.productSlug}-${selectedColor}-${selectedColorName}`.toLowerCase().replace(/[^a-z0-9_]/g, '');
            const bustSize = bust;
            const waistSize = waist;
            const hipSize = hip;

            sizeAbbreviation = `${bustSize}-${waistSize}-${hipSize}`

            let name = product.productName;
            if(selectedColor && bustSize && waistSize && hipSize){
                name += `- ${selectedColorName}, (Bust: ${bustSize}),(Waist: ${waistSize}),(Hip: ${hipSize})`
            }

            newProduct = {
                ...product,
                name:name,
                variantSlug:variantColorSlug,
                size:sizeAbbreviation,
                price:selectedPrice,
                bust:bustSize,
                waist:waistSize,
                hip:hipSize
            };
            console.log(newProduct)
        }

        addToCart(
            newProduct,
            qty,
        );

        Reset();
    }

  return (
    <div className='CustomModal'>
      <div className="innerCustomModal">
        <div className="headerCustom">
            <p style={{color:"black"}}>Customize your own size</p>
            <span style={{cursor:"pointer"}} onClick={onOpen}>
                <CloseIcon/>
            </span>
        </div>
        <div className="headerCustom1">
            <div className="innerInputDet">
                <div className="leftInputLabel">
                    <label><p>Bust <span style={{color:"#1a1a1a"}}>*</span> :</p></label>
                </div>
                <div className="rightInputLabel">
                    <input type="text" value={bust} onChange={onChangeBust} placeholder='Enter the Bust Size...'/>
                </div>
            </div>
            <div className="innerInputDet">
                <div className="leftInputLabel">
                    <label><p>Waist <span style={{color:"#1a1a1a"}}>*</span> :</p></label>
                </div>
                <div className="rightInputLabel">
                    <input type="text" value={waist} onChange={onChangeWaist} placeholder='Enter the Waist Size...'/>
                </div>
            </div>
            <div className="innerInputDet">
                <div className="leftInputLabel">
                    <label><p>Hips <span style={{color:"#1a1a1a"}}>*</span> :</p></label>
                </div>
                <div className="rightInputLabel">
                    <input type="text" value={hip} onChange={onChangeHip} placeholder='Enter the Hip Size...'/>
                </div>
            </div>
            <div className="innerInputDet">
                <div className="leftInputLabel">
                    <label><p>Remarks :</p></label>
                </div>
                <div className="rightInputLabel">
                    {/* <input type="text" /> */}
                    <textarea cols="30" placeholder='Enter the Remark (if any) ...' value={remarks} onChange={onChangeRemark}></textarea>
                </div>
            </div>
            <div className="innerInputDet">
                <div className="leftInputLabel">
                    <label><p>Qty :</p></label>
                </div>
                <div className="rightInputLabel">
                    <Qty 
                        changeQty={ onChangeQty }
                        max={productStock }
                        value={ qty }
                    ></Qty>
                </div>
            </div>
        </div>
        <div className="NoteRemark">
            <p>
                * Please provide details as accurately as possible.
                <br />
                * For any queries regarding sizing, get in touch with our team via email.
            </p>
        </div>
        <div className="MoveToCartDiv">
            <div className="product-details-action alignBtnCenter" style={{cursor:"pointer"}}>
                <a 
                    onClick={ e => onCartClick( e,0 )}
                    className={`btn-product btn-cart ${( !canAddToCart( cartList, product, qty ) || (!bust || !waist || !hip) ) ? 'btn-disabled' : ''}`}
                    style={{cursor:"pointer"}}
                >
                    <span>move to cart</span>
                </a>
            </div>
        </div>
        <div className="MoveToCartDiv1">
            {  
                cartDisabled ? 
                    (<div style={{marginTop:"-20px"}}>
                        * <i> Before moving to cart please enter the bust, hip, waist sizes</i>
                    </div>)
                :
                    ""
            }
        </div>
      </div>

    </div>
  )
}

const mapStateToProps = ( state ) => {
    return {
        cartList: state.cartlist.data,
    }
}

export default connect( mapStateToProps, { ...cartAction } )( CustomModal);
