export const timestampToDate = (timestamp) => {
    let dateTime = new Date(timestamp)
  let date = dateTime.toLocaleDateString(); // => 2019/9/4
    let time = dateTime.toLocaleTimeString("ja-JP"); // => 12:03:35
  return date + " " + time;
};


export const sendEmail = (props,toppings,items,userdata) => {
    let toppingsBox =[]
    let orderInfoBox =[]
    props.cartInfo.itemInfo.forEach(iteminfo => {
      iteminfo.toppings.forEach(topping => {
        toppings.forEach((toppingData)=>{
          if(topping.toppingId === toppingData.id){
            toppingsBox.push(`${toppingData.name}${topping.toppingSize === 0 ? '(M)':'(L)'}`)
          }
        })
      })
      items.forEach(item => {
        if(item.id === iteminfo.itemId){
          orderInfoBox.push(`・【${item.name} ${iteminfo.itemSize === 0 ? '(M)':'(L)'}】,【（トッピング）：${toppingsBox.join()}】数量:${iteminfo.itemNum}<br>`)
        }
      });
    })
    const EmailAddress = userdata.email
    const nameForEmail = userdata.name
    const addressForEmail = userdata.address
    const telForEmail = userdata.tel
    let paymentForEmail = ''
    let totalPriceForEmail = userdata.totalPrice
    if (userdata.payment === 1){
      paymentForEmail = '代金引換'
    }else if (userdata.payment === 2){
      paymentForEmail = 'クレジットカード決済'
    }
    const EmailText = `${nameForEmail}様<br>
    今回はラクラクカレーをご利用頂き誠にありがとうございました。<br>
    ご注文が確定致しましたので下記の内容をご確認下さい<br>
    【ご注文者様】${nameForEmail}様
    <br>【ご注文商品】
    <br>${orderInfoBox.join()}
    <br>【お届け先】${addressForEmail}
    <br>【お電話番号】${telForEmail}
    <br>【お支払方法】${paymentForEmail}
    <br>【合計金額】${Math.floor(totalPriceForEmail * 1.1)}円（税込み）`
    window.Email.send({
      Host : "smtp.elasticemail.com",
      Username : "okawara0618.info@gmail.com",
      Password : "14621B1362D6BFA0C786DF4C0118F9737D5A",
      To : `${EmailAddress}`,
      From : "okawara0618.info@gmail.com",
      Subject : "購入確認メール",
      Body : `${EmailText}`
    }).then(
      () => alert('ご注文確認メールを送信しました')
      )
    }
