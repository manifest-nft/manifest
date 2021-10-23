import Moralis from "moralis/types";
import { FormEvent, FormEventHandler, useState } from "react";
import { useMoralis } from "react-moralis";



const Profile = () => {
  const { authenticate, user, logout, isAuthenticated } = useMoralis()

  if (!user) return null // dont render this without a user

  return <ProfileForm user={user} />
}



const ProfileForm = ({ user }: {user: Moralis.User<Moralis.Attributes>}) => {
  const [email, setEmail] = useState(user.getEmail() || "")

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email.indexOf("@")) {
      console.error("not an email")
    }

    user.setEmail(email)
    const saved = await user.save()
    console.log(saved)
  }


  return <form onSubmit={submit}>
    <input value={email} onChange={(e) => setEmail(e.target.value)} />
    <button type="submit">update</button>
  </form>
}

export default Profile
