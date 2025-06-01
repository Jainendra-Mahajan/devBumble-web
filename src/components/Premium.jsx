import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Premium = () => {

    const [isUserPremium, setIsUserPremium] = useState(false);

    const handlePurchasePlan = async (plan) => {

        const verifyPremiumUser = async () => {
            try {
                const res = await axios.get(BASE_URL + "premium/verify", { withCredentials: true });

                if (res.data.isPremium) {
                    setIsUserPremium(true);
                }
            }
            catch (error) {
                console.error(error)
            }
        }
        try {
            const res = await axios.post(BASE_URL + "payment/create",
                { membershipType: plan },
                { withCredentials: true });

            const { amount, keyId, currency, notes, orderId } = res.data;

            const options = {
                key: keyId,
                amount,
                currency,
                name: `DevBumble`,
                description: "Connections and chat for developers",
                order_id: orderId,
                prefill: {
                    name: notes?.firstName + " " + notes?.lastName,
                    email: notes?.email,
                    contact: 9999999999
                },
                theme: {
                    color: '#F37254'
                },
                handler: verifyPremiumUser
            }

            const rzp = new window.Razorpay(options);
            rzp.open();

        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        verifyPremiumUser();
    }, []);


    if (isUserPremium) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="bg-green-100 border border-green-400 text-green-700 px-8 py-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold mb-2">🎉 You're Already a Premium Member!</h2>
                    <p className="text-lg">Thank you for supporting DevBumble. Enjoy all your premium features and happy connecting! 🚀</p>
                </div>
            </div>
        );
    }

    return (
        <div className="my-10 px-4">
            <h1 className="text-3xl text-center text-primary font-bold mb-8">Premium Plans</h1>

            <div className="flex w-full flex-col lg:flex-row gap-6 justify-center items-start">

                <div className="card bg-base-300 rounded-box p-6 w-full lg:w-1/2 shadow-xl">
                    <h2 className="text-center text-xl font-semibold text-primary mb-4">Silver Plan</h2>
                    <ul className="list-disc list-inside space-y-2 text-base-content">
                        <li>Connect with up to 10 developers per month</li>
                        <li>Create and customize a developer profile</li>
                        <li>Access to basic search filters (language, location, role)</li>
                        <li>Send up to 5 connection requests per day</li>
                        <li>Join community events and webinars (limited slots)</li>
                        <li>View public developer blogs and projects</li>
                        <li>Access to 1:1 chat with matched connections</li>
                        <li>See who viewed your profile (limited insights)</li>
                        <li>Earn and display basic badges and achievements</li>
                    </ul>
                    <button className="mt-5 mx-auto w-1/2 btn btn-active btn-primary"
                        onClick={() => handlePurchasePlan("silver")}
                    >Buy Silver Plan</button>
                </div>

                <div className="divider lg:divider-horizontal">Vs</div>

                <div className="card bg-base-300 rounded-box p-6 w-full lg:w-1/2 shadow-xl">
                    <h2 className="text-center text-xl font-semibold text-primary mb-4">Gold Plan</h2>
                    <ul className="list-disc list-inside space-y-2 text-base-content">
                        <li>All Silver Plan features included</li>
                        <li>Unlimited monthly connections</li>
                        <li>Smart match suggestions based on skills and goals</li>
                        <li>Advanced search filters (tech stack, availability, interests)</li>
                        <li>Unlimited connection requests</li>
                        <li>Priority access to exclusive events, hackathons, and live Q&As</li>
                        <li>Group chat and voice call features</li>
                        <li>Find or become a mentor or mentee</li>
                        <li>Profile analytics: views, message response rate, match insights</li>
                    </ul>
                    <button className="mt-5 mx-auto w-1/2 btn btn-active btn-warning"
                        onClick={() => handlePurchasePlan("gold")}
                    >Buy Gold Plan</button>
                </div>
            </div>
        </div>
    );
};

export default Premium;
