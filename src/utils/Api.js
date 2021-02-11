
class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    //GET https://around.nomoreparties.co/v1/groupId/cards
    getInitialCards() {
        return fetch(this._baseUrl + '/cards/', {
            headers:  this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
        //.catch(err => console.log(err))
    }

    // GET https://around.nomoreparties.co/v1/groupId/users/me 
    getUserInfo() {
        return fetch(this._baseUrl + '/users/me/', {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
        //.catch(err => console.log(err))
    }

     //PATCH https://around.nomoreparties.co/v1/groupId/users/me
    setUserInfo({ name, about }) {
        return fetch(this._baseUrl + '/users/me/', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
        //.catch(err => console.log(err))
    }

    getAppInfo(){
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    //POST https://around.nomoreparties.co/v1/groupId/cards
    addCard({ name, link }) {
        return fetch(this._baseUrl + '/cards/', {
            headers:  this._headers,
            method: "POST",
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
        //.catch(err => console.log(err))
    }

    //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
    removeCard(cardID) {
         return fetch(this._baseUrl + '/cards/' + cardID, {
             headers:  this._headers,
             method: "DELETE",
             })
         .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
         //.catch(err => console.log(err))
     }

    //PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId    
    addLike(cardID) {
        return fetch(this._baseUrl + '/cards/likes/' + cardID, {
            headers:  this._headers,
            method: "PUT",
            })
        .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
        //.catch(err => console.log(err))
    }

    //DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    removeLike(cardID){
        return fetch(this._baseUrl + '/cards/likes/' + cardID, {
            headers:  this._headers,
            method: "DELETE",
            })
        .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
        //.catch(err => console.log(err))
    }   

    //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    setUserAvatar(avatar) {
        return fetch(this._baseUrl + '/users/me/avatar/', {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({
                avatar
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject('Error' + res.statusText))
        //.catch(err => console.log(err))
    }
}

const api = new Api({ 
    baseUrl: "https://around.nomoreparties.co/v1/group-7", 
    headers: { 
        authorization: "7c54637c-526f-4047-8439-3339585d598e", 
        "Content-Type": "application/json" 
    } 
}); 

export default api;

