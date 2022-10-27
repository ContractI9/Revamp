export default function CourseCardHover(){
    return(
    <div>   
<button data-popover-target="popover-company-profile" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Company profile</button>
<div data-popover="" id="popover-company-profile" role="tooltip" className="inline-block absolute  z-10 w-80 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm opacity-1 transition-opacity duration-300 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom" style={{position: 'absolute', inset: '0px auto auto 0px', margin: '0px', transform: 'translate3d(0px, 236px, 0px)'}}>
    <div className="p-3">
        <div className="flex">
            <div className="mr-3 shrink-0">
                <a href="#" className="block p-2 bg-gray-100 rounded-lg dark:bg-gray-700">
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/logo.svg" alt="Flowbite logo"/>
            </a>
            </div>
            <div>
                <p className="mb-1 text-base font-semibold leading-none text-gray-900 dark:text-white">
                    <a href="#" className="hover:underline">Flowbite</a>
                </p>
                <p className="mb-3 text-sm font-normal">
                    Tech company
                </p>
                <p className="mb-4 text-sm font-light">Open-source library of Tailwind CSS components and Figma design system.</p>
                <ul className="text-sm font-light">
                    <li className="flex items-center mb-2">
                        <span className="mr-1 font-semibold text-gray-400">
                            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd"></path></svg>
                        </span>
                        <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">https://flowbite.com/</a>
                    </li>
                    <li className="flex items-start mb-2">
                        <span className="mr-1 font-semibold text-gray-400">
                            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
                        </span>
                        <span>4,567,346 people like this including 5 of your friends</span>
                    </li>
                </ul>
                <div className="flex mb-3 -space-x-3">
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" src="/docs/images/people/profile-picture-5.jpg" alt=""/>
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" src="/docs/images/people/profile-picture-2.jpg" alt=""/>
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800" src="/docs/images/people/profile-picture-3.jpg" alt=""/>
                    <a className="flex justify-center items-center w-8 h-8 text-xs font-medium text-white bg-gray-400 rounded-full border-2 border-white hover:bg-gray-500 dark:border-gray-800" href="#">+3</a>
                </div>
                <div className="flex">
                    <button type="button" className="inline-flex justify-center items-center py-2 px-5 mr-2 w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"><svg className="mr-2 w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>Like page</button>
                    <button className="inline-flex items-center py-2 px-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shrink-0 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button"> 
                        <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div data-popper-arrow="" style={{position: 'absolute', left: '0px', transform: 'translate3d(0px, 0px, 0px)'}}></div>
</div>
</div>
    );
}