import { Navigation } from "../components/Navigation";
import image from '../assets/bank.jpg';

export function HomePage() {
    return (
        <div>
            <div>
                <Navigation logo={"MoneyWallet"} signup={"SignUp"} signin={"SignIn"} />
            </div>
            <div className="flex flex-col px-10 sm:flex-row items-center justify-between px-8 py-16">
                {/* Text Section */}
                <div className="sm:w-1/2">
                    <h1 className="text-2xl mt-10 sm:text-4xl font-bold mb-4">Welcome to MoneyWallet</h1>
                    <p className="mt-1 sm:text-2xl">
                        Connect with others and transfer funds securely and instantly. 
                        Whether it's for a friend, family member, or a business partner, 
                        MoneyWallet ensures your transactions are safe and easy.
                    </p>
                </div>
                <div className="mt-10 sm:w-1/2">
                    <img src={image} alt="Bank" className="w-full h-auto" />
                </div>
            </div>
        </div>
    );
}
