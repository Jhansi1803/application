import React from 'react'
import '../LoginAndSigninPage/LoginAndSigninPage.css'

export const Notes = () => {
  return (
    <div className='notes--container'>
        <div class="sticky-note">
            <div class="note-header">
                <div class="note-title">probably some random email</div>
            </div>
            <div class="note-content">
                <p>your notes from the email goes here</p>
            </div>
        </div>
    </div>
  )
}