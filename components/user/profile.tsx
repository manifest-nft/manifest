import Moralis from "moralis/types";
import { FormEvent, FormEventHandler, useState } from "react";
import { useMoralis } from "react-moralis";
import { PhysicalAddress } from "types";


const Profile = () => {
  const { authenticate, user, logout, isAuthenticated } = useMoralis()

  if (!user) return null // dont render this without a user

  return <>
    <ProfileForm user={user} />
    <AddressForm user={user} />
  </>
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

const AddressForm = ({ user }: {user: Moralis.User<Moralis.Attributes>}) => {
  const [address, setAddress] = useState<PhysicalAddress>(user.get("address") || {})

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    // if (!email.indexOf("@")) {
    //   console.error("not an email")
    // }

    user.set("address", address)
    const saved = await user.save()
    console.log(saved)
  }


  return <form onSubmit={submit}>
    <input placeholder="name" value={address.name} onChange={(e) => setAddress({...address, name: e.target.value})} />
    <input placeholder="company" value={address.company} onChange={(e) => setAddress({...address, company: e.target.value})} />
    <input placeholder="address1" value={address.address1} onChange={(e) => setAddress({...address, address1: e.target.value})} />
    <input placeholder="address2" value={address.address2} onChange={(e) => setAddress({...address, address2: e.target.value})} />
    <input placeholder="city" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
    <input placeholder="state" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} />
    <input placeholder="zip" value={address.zip} onChange={(e) => setAddress({...address, zip: Number(e.target.value) || 0 })} />
    <input placeholder="country" value={address.country} onChange={(e) => setAddress({...address, country: e.target.value})} />
    <button type="submit">update</button>
  </form>
}

export default Profile
