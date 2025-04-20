import Headline from "../../../Components/Headline/Headline";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useUser from "../../../hooks/useUser";


const Users = () => {
    const [users, refetch] = useUser();
    const axiosPublic = useAxiosPublic();

    const handleAdmin = (userId) => {
        console.log(userId)
        axiosPublic.patch(`/users/admin/${userId}`)
            .then(() => {
                refetch()
            })
    }

    return (
        <div className="p-4">
            <Headline text={"All Users"} />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="text-sm">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Badge</th>
                            <th className="py-3 px-4 text-left">Role</th>
                            <th className="py-3 px-4 text-left">Joined</th>
                           
                        </tr>
                    </thead>
                    <tbody className="">
                        {users?.map((user, index) => (
                            <tr
                                key={user._id}
                                className="text-sm"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{user?.name}</td>
                                <td className="py-3 px-4">{user?.email}</td>
                                <td className="py-3 px-4 capitalize">{user?.badge}</td>
                                <td className="py-3 px-4 capitalize">
                                    {user?.role !== 'admin' ? (
                                        <button onClick={() => handleAdmin(user._id)} className="btn">
                                            Make Admin
                                        </button>
                                    ) : (
                                        <span className="text-green-600 font-semibold">Admin</span>
                                    )}
                                </td>
                                <td className="py-3 px-4">{new Date(user?.date).toLocaleDateString()}</td>
                        
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
