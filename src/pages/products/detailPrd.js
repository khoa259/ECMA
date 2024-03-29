import { get } from "../../api/product";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { addToCart } from "../../utils/cart";
import { $ } from "../../utils/selector";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const DetailProduct = {
    async render(id){
        const{data} = await get(id)
        return /*html */`
        ${Header.render()}
        <section class="text-gray-700 body-font overflow-hidden bg-white">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="${data.img}">
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">${data.name}</h1>
              <div class="flex mb-4">
                
                
              </div>
              <p class="leading-relaxed">${data.desc}</p>
              <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
               
                <div class="flex ml-6 items-center">
                  <span class="mr-3">Size</span>
                  <div class="relative">
                   
                    <input type="number" id="inputQty" class="border border-gray-400 " value="1" min="1" />

                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900">${data.price}</span>
                <button id="btnAddToCart" class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">ADD TO CART</button>
                
              </div>
            </div>
          </div>
        </div>
      </section>
      ${Footer.render()}`;
    },
    afterRender(id){
      $('#btnAddToCart').addEventListener('click', async function(){
          const { data } = await get(id);
          addToCart({...data, quantity: +$("#inputQty").value},() => {  // ... dùng để copy hết các giá trị trong 1 mảng của 1 id trong db
              toastr.success("thêm vào giỏ hàng");
          })
      })
  }
};
export default DetailProduct;