import React from 'react';

const Policy = () => {
    return (
        <div className="my-16">
            <div className="card card-dash bg-base-200 w-[90%] md:w-4/5 lg:w-3/5 mx-auto shadow-2xl">
                <div className="card-body space-y-4">
                    <h2 className="card-title text-primary text-2xl mx-auto">Policies & Legal</h2>

                    <div className="prose max-w-none text-base-content">
                        <h3 className='font-bold '>Privacy Policy</h3>
                        <p className='p-2'>
                            We collect minimal data to provide our services efficiently. Your data will not be sold or misused.
                            Information like your email or name is used only for authentication and personalization.
                        </p>

                        <h3 className='font-bold '>Terms & Conditions</h3>
                        <p className='p-2'>
                            By using this website, you agree not to misuse or copy our content or services. The code and content belong to DevBumble.
                        </p>

                        <h3 className='font-bold '>Cancellation & Refund Policy</h3>
                        <p className='p-2'>
                            Refunds are applicable only in cases of non-delivery or technical failure. Cancellation can be requested within 72 hours of purchase.
                        </p>

                        <h3 className='font-bold '>Shipping & Delivery</h3>
                        <p className='p-2'>
                            As our platform is digital-first, most deliveries happen via download links or direct dashboard access. For any physical product shipping, timelines will be provided at checkout.
                        </p>

                        <h3 className='font-bold '>Contact Us</h3>
                        <p className='p-2'>
                            If you have any questions or complaints, contact us at <a className="link text-primary" href="mailto:jainendra.mahajan456@gmail.com">support@devbumble.space</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Policy;
