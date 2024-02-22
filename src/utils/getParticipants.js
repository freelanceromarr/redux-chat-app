


const getParticipants = (users, authEmail) =>{
    const participants = users.find(user => user.email !== authEmail)
    return participants;
}

export default getParticipants;