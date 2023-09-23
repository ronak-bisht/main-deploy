const Razorpay = require('razorpay');
var crypto = require("crypto");
var instance = new Razorpay({ key_id: 'rzp_test_fQdtsjqUN9gpM1',
key_secret: 'zFsNueHXMeIaZqziMNIGPxTh', })



const checkout=async(req,res)=>{
    var options = {
        amount: req.body.price,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      const order=instance.orders.create(options, function(err, order) {
        console.log(order);
        res.json({
            order
        })
      });
}

const payment=async(req,res)=>{
    let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

 
  var expectedSignature = crypto.createHmac('sha256', 'zFsNueHXMeIaZqziMNIGPxTh')
                                  .update(body.toString())
                                  .digest('hex');

    const isAuthentic=expectedSignature===req.body.razorpay_signature
    if(isAuthentic){
        
        res.redirect(`http://localhost:3000/success/${req.body.razorpay_payment_id}`)
    }else{
        res.json({
            message:"no payment"
        })
    }
    
}
module.exports={checkout,payment}