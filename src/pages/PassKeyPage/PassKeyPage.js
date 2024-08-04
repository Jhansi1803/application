import React from 'react'
import '../LoginAndSigninPage/LoginAndSigninPage.css'
export const PassKeyPage = () => {
  return (
    <div className='cont'>
        <div class="img">
                <div class="img__text right_con">
                 
                    <h3>Seems you didn't enter the passKey</h3>
                    <div className='down_box m--up'>

                    <h6>Note: Nobody can see the passkey except user</h6>
                    <h6>we use special methods to ensure your safety and privacy</h6>
                    </div>
                </div>
            
        </div>
        <div class="form sign-in passkey">
            <h2>Welcome Back!</h2>
            <label>
                <span>Email</span>
                <input type="email" />
            </label>
            <label>
                <span>PassKey</span>
                <input type="number" />
            </label>
            <button type="button" class="submit">Submit</button>
         
        </div>
        
    </div>
  )
}
