import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BookOpenIcon, AwardIcon, StarIcon, ChevronRightIcon, HandMetalIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function IndianSignLanguage() {
  const [activeTab, setActiveTab] = useState('lessons');
  const lessons = [{
    id: 1,
    title: 'Basic Greetings',
    description: 'Learn everyday greetings in Indian Sign Language',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevNcVaTpHfpefFF2oHOsugpcIBIUIwapvDQ&s',
    duration: '10 min',
    completed: true
  }, {
    id: 2,
    title: 'Alphabet A-J',
    description: 'Learn to sign the first 10 letters of the alphabet in ISL',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQsAAAC9CAMAAACTb6i8AAAAkFBMVEX///8AAAD+/v77+/sEBAT39/fy8vLt7e34+Pjj4+P09PTw8PDZ2dliYmLMzMzm5uZtbW3X19e7u7uurq7AwMCenp50dHTGxsZVVVWTk5M7Ozu1tbWEhIQvLy9JSUnS0tKMjIwzMzMjIyNFRUUXFxcdHR2QkJBQUFBnZ2d7e3ujo6NxcXESEhI4ODgiIiJcXFzgl05YAAAWEklEQVR4nO1d6baqurJOoyII9h2K2PfO5fu/3a2qJMDUBJ0/7hj3npNv77GmSipNJdUFUjDm4eHh4eHh4eHh4eHh4eHh4eHh4fEfC4H/q/+KHz6TwD8A/VV8QfOb/rvy4rvuvJGwsmN/qgCHJAHCwFTxgUZIzYuS7qu2WJX2i+JSj+4PNGXH5NddM8T4R7albJtfPtJQB2XUarWiSOqeftsg+7a87lgEzUTtotW/4k+8YCxeXpN89fOzmN9Pw1h+XlWCBd1Jf//ggMdPshmH363ETtgdD4fL8aD3Xd+i2SlZYSN8m5xmrY+NwOVgPUyzaR9xv25uqqmvmIE8W2+hrcPqvNpx1WwWwhTIOpJBggXzyzXrnxXVeSRr1pPEGe1uFPOIgfs01IvY0QZUFm2gfCOf3+d7IjpmAZN1a16w8Knr3/ECi+uMKbpPvGAxv4zNNDXj5fQA5M+gZmCCdfkqXTfN93Z8o77e6vjHAijzc5+Mht3haEPlLyGT0sEL6Dob8sdkYKrsDYn9EynqZjnmP5Nur21G04M18iSuLNk3i13u50ZJSRq/HP4A8dpJCnPJp4wVKpCI4j6ujcBFJFmw286C8ofeDbs4Ym3XupDsxidtplU61RtOgWTfqTFCYpWoQZHKlXo611ecqM+2C+d4UFgC3Wj7AsSBi5GCjXgIfRV6JQvV6Axodk3HchLsfGwX5alMMwOCjau8gPqWWq8L0xL0FdpwLVn4dczjogX6oxvbAF2PfdK8gvVX8mXQwFOgTZh0jSs/v9UL4tEDorlLtCY8/HUJP46AIGVWuYIR8OtrXdgGCPBPZBdFKA1LvHKtlKaI2P7RCkl+em0T5vxKC8Mh/j0+eRsy2mMc29i+mJpEUuUFfpsAQddKQGvvtX3U5zGQTO1t4GyMHH1ecL76KCIiBPp3Xox5A5aog5FrPvw9MKbUdESryYoJ77yQEDPOoOTt64I9tyDwv39EhxC0SAP4Z6eZgZaz8wJ1deujjMyAF8QxVFfBZKAUTwdo7y5GzqAzSv9LbRSVAZGgc3et9yag4sWcEY/pGxUmJbOGZoZ2sTrMK66VxP9UJxm4Gz9vU6F4cQM9ZgSDhtNDW4ddbUBDnY8uF6i8S6yIBfvHeVtpnRzcjKaDeAb9p64BSQd8k+1INd/+p1TuOzM6j8U1i9Q8A1FvMiFNJtqwdp9WHR3xCyvWpWTpYcIUJ9mSFobFfKPMldYPSqaowEZgYSV+erQ/+heo8VZNRTyEZkYq0EIlHzp5sThF1KiEniFUz1DLHzo2XgQPpYwZrQeUebREUD1a4sjOi9W0H+orEqVvpivDz29q1fBilxnfgpppkKuVLHidWq9UkJAzQbx4AvFTSfKYrL+deIBmXg1SJPw+WuAooSi6r2dbJwXJ68JEnXveaPANLUQny5s4jFVb+wTYm7mSEbBiICQ2F03QZEyL2PSmWEFouJT0rwpk83oE7U/NgPvTWClLGkIFmZ1ayD3pf4br4jrN0hkJZ7jHFkf2ZsJdqf5D6lpCRHfkhaUZweY4hIEeGJq1QvoyF40i0u4LrpIGz/MHMh5wYg4XtzIuiRLYJWIUlxR8EiRpQedzBy9Y/IN+nIlwBYW4IJLQKM6kFc2hNrdKErfIC2h74eQFCVJX8wK8iqSwHi5LDLxtn448Mr1C8U3jzQFZny+ZcLhLvyoAopA+41oITNfOqAbsNFDpGPwFTa1Mw49ai28+QTG2lBvdP4K+TR7oxUc03y3LuGCGonVqeIFWbfgc6msjEt/3dii2mXJpZKR5LsOz3Fi8T5gcaXNABKBs2SEsl2VoLy+QbTf61BSdVguVxRRXxU/skkkhFxem5wt5MXzwHINxIEqcOu3GY3UN3fvWdFzhxc3VUHKsfJmNRsu4yQZHdBA+A6tMnvgJbAGsvn6uOT4i0+9CV12TWOyxhwVIvFu7mwlwKksZGefFlK2dvJhoecVGGuwSFj8rCbWOZn+pDExBknG12Hob/TGlv8CMwWgUaauOOnniJJrxWDVD5oq3lUl4OBYSDadn5BhFcTTWBg+NlWvtZg8tPjCWpzybODOrWRfRI/01Nqxb0LzOnF2rlAaV2VWfCl8I/2CP+w4aXL5qXKBul6P+DymOJzDjNcwrsEG1oAUZ1kS+PhAnrj3l51oxX7CCF5t7bNrO3WEP9HpmvGiIm+KWcnZPegPjMy9m4O1oXlR2ttvGibDyYrNTH4HjmzQNgFLKoCYGZ89VsZcqQnJ9Rjdgx7n9GnRUsDPBzRAW0UzJrqCY02p7EDMQK3VJCpTaywA+NleooZzNFMPCxb3TH8t/SXI4PzrpkkRxX7aioMnUJjroT/5oOeZ4b2IwZHg8zVC1xOTDOHkRwUWNTdYr4hFUpP9stkdZq6K6oZLCy3JJjo9bfAtq6Nliow1/fEuHJrRSrmLkolulzMRmJJT4HwW3Q8eE7WFdqCvatqEBxJlzMQ9ZVV3XUup45Mm5y/aAEz0vvlx56Xc2wB92NVNpggWq/6jflXuj1T365vbdaiGaVvELoc2rgxc5DPqt/8MPtuo9Nlea19ik98uPYilBqAP2egtWmzgSO5upVt41AcGOGNkIdJev5ANbSWDKbFdq1C27FD5kBV2OcYkLN+u6vmv3zOar0paRAZredXhVC2PgFsVqBany1ATTa2pY/F636dSzXJlBBRdHoylGN6+XxhRyuoCmx9IGNJJZtx/FL7GSTXNXAGPkRfRZRqDK5EcvXqDZDp+6NsULl1FO+euOt9D7BS4Z6XL+LiMTGpcLd97+/QPwsvPACbNvSwtsxTinKPzZ5TqZDXrReqXW68e9HIH7+1QIgrytcSgZLtE6XvRe9yKho0faGLSjeeCTtyWzp/0SF578pe+Stcm1mzij73HZ4+rKGbnjiSpExM0GMQpYsOTGp5nU8uL1itT7BTbZoeqy9+6guqhRas83GQnIOubugHNWqmJ0o4XehIzrIpgKQp7qUkgxyxpoukWdjNAG9lVtfxXeiCSnnSfO4CxEodXGW5G0QcmDC+PsYqINdFGgS3cgGzW39GY0GO3emls3Qjsyn7HGWxR0K6YFPN+cF/pWFUaeznUxxvkkpwI3IWgThJSa0x+E+jYwo+SWmYcbEiS4uRV8xlct1Rma4p52GNyxMA4mf7ktKdUmXZ1eKjEoSuGm5Hx7wIWJ/cvN5pVlYE0VlAp1GxF60crIo7laN6iZKgl6/UjMJXsS5kiwrdlggYW2Mh0Q6z5XrHDHwjgEXMpVXqigok/RwWcMILa/jbvDG1ni85YfJ2HQCegepEPhCHVT7jkO1K2AznrKyafJpfNeG7AsxCV+XvYi0exg9egEDVz3YISK4fjqmk7S7Mw1J/YOfWRoQLeOXwo010npKtQBJKPc/IHO3ZVvctS/ONttqlh9MU/6T3qQgDraETX3b0Fs1RMH23xh6h9bjaNBr+JFq4+bT/oPLcb5Nuip8CyIu5P+StFafJXXDlJE1dCcAGGMuPnK8WanE53FW0f77XpVLVhQ7uA01HqvIwDmbTk3TjQ24NJGJYmcq6KH42p1PFTacm/FlAC1lJkHRBpPaKzTL7rruO9LjQoxqTztAZivdfjk7ifoidGipMgi1q4pT3I/Mk+vHM+T3udnlKAHCbfg4LrP+jImmK7Z5HQ6Tbo9pdZ6o+zev2fL2sdR4FJzluVqsa8ut7AIQN1toS6R6818tdv93EfBJ0dQBcG9wXA4nMUdZSU/eo4Q8OWvnJiPWp/vsTtqs3x0FW63OkHgeAbATdRu1i4IO9X3JXvDNFkcH4/D4eeZ3bqdv3VPV2LaK579+KKHv3aAvmqFdgjEX0b3J7z15S/P8enylS/6iZavyPTDL39pSfsk/0u8kGqrsnhc9YuH1v5jId4+eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHj8H8ev9HvfPQdYZCczNXyRVEEWzxjqpw1lmRTM3Y40T4OKDwVfHz0W4qWT3wALt4NwDRiEnaaup/4RT3PmtoVQKSW/4V/5RYpKzlA3G+kp86jT6/VabVb3zLk6j9+MNFrtpir63aOqFcTZT/FM/DY5dS0pgN6aZjK+9ff0SPi//WUy+OKRSqDI+kmS9K+3daRZI5u/TlK9kUgxTHaqYxd8stvdIxZm+epwPByOiO1PPu9P02H4B14IStTEn6fJaDQ5XdWj5Y+kWzc0vNLLMIfUeZpdpyoDyWpSl7YSL3X/VR5ZP14jrGRxPK6SofM5aoEHJA+XazalIwaH9zRnZck157vz/HmdzufzfGsOqfC7/PopY4GZ3arnK4JZhgc3FoOayWJhwg/ZuDjw3hrSWQtH4jDVjBjw+zDutFm7s15e8YxLnPLDPsdPu/j9KK/GrTir2MUDEV1XQSEW+ctP7XB9A5Ysmh9z5RTjEs9FRdGQ6M5wqt35M0TKf5ayULM0VQEer3Yfv4Giqzsr0jQySflah6gD1phHwHl66l+itAR2bEGpqRwDizEtRqmCdEN4CNGaj8vaSRZi7j1qq3iaHI+H8oYjz4FgJz4SrJoumc4i4vFe99lbNsbx0plRakEd1kMNyuQBszbZpxtT85jH3XXySce4RpSXsnweXqgjjHi4tFeTZuP3yFL+lm6OMgnxjZWf8iUdQ0FCB/6armOZ7JlXv2HGsmLCMP9T197dJSYcNN1Q2V4ck5zywGaPMFWW+6jzWydXb3m4gI8XkGJbfjgc89FyVl6ok8hLV1ej34e+8Fw0P+vkSsh4xwnSDaarM91Dni1d40od+Uo5Jv37lhc/j7fJlJJyPzkSt/G+pVGh8i6mLl7EVf2jco3whj5g1N4iX6zISFvqKod1c5yCvrDxovFF8s4CPxWdV0gapbPY2NYFmZ3KMQ0zdsW+t9SoBjN1vFdT4UrgO33QmTKPPOzHJjOcVanPZWNaidRl7Jd8FUdRp9MpjnHTnGJL3/KCjmUWR5SlSaVGGRzt59NnFdtJ3l4rjONexHqYpOc956vGmE9kuf5QvW8nRWI6tEH2FFgqtZhOHKTWhWMcoXEodmOT4PL02M3RL1l8kwuESAa8POMMMzAYoxojXthS8mGPyiQnmHe2T27hKj9wOorsmIIuDH5V6Fw6b18m6bOnecNrmLExNxO9rOGFynSojqOG5cC4zgr5BSeIffG5yE8iBdW4aVHigrODF8NmeU7vVrqSDcxD5TL/HSpizHT7AWXvqPlreEHc6Gz4zpzwW9boCynKDHyZKr/USRrduYstaJW5Wka6unQBQ7PluVVZ5BYmVfqQVw8+LwJXynmVRcIkWpIMs5WUielwApypMPJ/JqHUrUY5Y7vj6wXw5DvVIq4L8Dv38V/Cs4BvzMen4SX+taczpVQX2ig0KSckv05VbDfPXD4yZj+HQE5bRBgcOMgmIXItL8Dm/zO6UOXic0YuGtGB0w8igp5NO6Era7kdYZHtT+A6S6+KFf9alnFh3njKjUH1j7FcRindNRznpWm5zAwv8C0f2stVw3XICCHf6u0LysXndGDY+LJY9GPg81mn1JEwmL2s3x95QyWXFczQUbLWBtNVDGzNCpXsT2eVwt7lId+lszgMWz1KLO6aN6V1zTdjvvGbXDjtCKMU6JoX01LKXgpJ1tvyHBfnGBNeBKr8RnXnD8dnUeiLSUF/6Tq7nfrPpT0cwQnuZTwqHAM+3uZNvUbD2vgM5N2eviw6OHkBDFtlhheJ8sFtpaLGNcA8XvzQBpZpXow5tyX2coPk0HRE6vxraP5Dax2UhOW60qS4uMGuFCFDzvk/d1Mnbv8dbczRlfGuZQRYOau2TBGwLPo5dn5GC2ejeKGmxunw2AAlpysj4xhIzsbdqIeJz61H8Glp50+t9pAXo8L5VcbCnRtpurP/PuBOH1yoRJSqa0dSKzbBDUl2yJ1NYF0IJYPtnTN5nxP5/OUH5YLfnHHWzkRSd+JFWsxVl7Sna+vp/NSfdPJ4k5AY1+LFSkLbVSpLHsX5/C3NmSqE7x/AEqgxWP9hLsBC2v2RF4/XVHCSyW0RRr6jVygFyraMvo0uiBPTd5HJgoXgNu0X864RrZTXZPdZch3NUuWPtrX2jDZHVJav5Xlqfsa3h/xtHzx4c2yBfg5qyPVylRBCMI2E65Wgpg5f17F3h+1Fol7lrY51SZI0e9/AkB6NR4aitLJXnvG1stCUJSbW8QiZud4f1AUGnjojYRlxCfFD9sjFi7sZvbwliUoKTRtjobu7jDbQaFCsrZJAP3VJzp3ZoiQmTtW8QM2Y28PUjAQa07Wk20fpjm1q1dcbcH9am31ga+u6z/FdRypZucuP7/GFzmMlivAY+3HacuKFYzmNdWphtdnEi3xy+K3hci+au9TICO4JTG2Vo2zMDcdkVG5jTNxMtremM8fjp7b2vy999C1Xrg275gq3EBUHjAIswsJitt9Quhch6XuT/R+VzsLelBCdUherFNDWIYQm6ZtUeWb1hQy68wdekMKJdcQ0KaIRjDLciduemHZRGHq1/9s56ijN6d2kmhcqX/80Ui91UfnuHG8vQOevqC/RbqdlYbS3VEORC0U1A2au8SF11SsvRsW6qOSdB9XpTtB1Q9eoIj+StBbycTW130rA/kwLlw55cRlhBI+ziHtArjTXbGlS8EmBeRpd0n9CxSBf7guTc/ZFusqSBHihvRnSwoNoOMe0Vk93rnVYuL9fG0R778CKBTbs3Cu4F7zAdzfM93fVPLr93BYGEor08eo1JlbvVJC93bV/7YNj3jus2fVOGXs9S21TcU+lQbFVKx70nHeycLTZb8mleK3BH4EQrte3MeSF0RcR2JGDsl4q+sxtr5ohZPiuI/pEJtW1kYM+yvmXfgNeoBnZ/i251pqvpBlRwx78/AaEQg98pwcrbi1tyEaSv+CmvqIsUvGWTnFJ9vXhUomaqKnyjpFacbwcCs0HhEKLWHdJ3S2ijRbnZrQdEZiM27rXDGeX2m6VLavcpfu16oYYr2hsqXODT2ECMtRuymY8onfT8PMy7oSzRCWEdeGq310Q0y5TTecCNOjXMqCUN66yA//JBWf9qsr8Ih2sem0JLu3TcnzLdmqHb1P3SklEt2yk0ag2CcGIs01Qisl0+vzHzVJyQCIzkMGn0ToO18uN6tWn+XlDoBoC0kZN5tQStAKHlbE0FA8/PJojt0VhwEwzpTZFqSgZqFJHup9Fkaz5a06J4Fn7HIS1wXBfWRbf0QgZ73WL9KKldY2uNTRh+QDGbsDWx7JNV39FWzzL0U2cGlZjtvq98vp/FBBiKVtP+s/nE/MnfkdNprxIirhf4sbHJ15A9DvqnwHJqUtpmrtpP+lfl0GNqodSGfHskae9Dy9gwnGMk+Ilrfz5pz0tU0fZxLfSpTxdEQ7TdDIM6Vmij7wQ7aKEkNXnQ9yyRZvEQRgPwkCVq+UFbSUH3dEpy7IJvhX27UWC/7X465r4fwBR+fe/HWaH7+vy/3td+T/asIeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4cN/wOiRQEaN82KdwAAAABJRU5ErkJggg==',
    duration: '20 min',
    completed: true
  }, {
    id: 3,
    title: 'Alphabet K-T',
    description: 'Continue learning the alphabet with letters K through T',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3v09WvcXchAZjyeCGVpb_PlOCCx1gkELh1Q&s',
    duration: '20 min',
    completed: false
  }, {
    id: 4,
    title: 'Alphabet U-Z & Numbers',
    description: 'Complete the alphabet and learn numbers 1-10 in ISL',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlO5fCYqAyUktJYN75iuDMSV8nAlSOvzsdJg&s',
    duration: '25 min',
    completed: false
  }];
  return <div className="flex flex-col min-h-screen bg-blue-50">
      <Header />
      <main className="flex-grow">
        {/* Module Header */}
        <section className="bg-pink-600 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-4">
              <Link to="/" className="text-pink-100 hover:text-white">
                Home
              </Link>
              <ChevronRightIcon className="w-4 h-4 mx-2" />
              <span>Indian Sign Language</span>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-white p-3 rounded-full mr-4">
                  <HandMetalIcon className="w-8 h-8 text-pink-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Indian Sign Language</h1>
                  <p className="text-pink-100">
                    Learn to communicate with hand gestures
                  </p>
                </div>
              </div>
              <div className="bg-pink-700 rounded-lg p-3">
                <div className="flex items-center">
                  <AwardIcon className="w-6 h-6 mr-2" />
                  <div>
                    <p className="text-sm text-pink-200">Your Progress</p>
                    <p className="font-bold">2/4 Lessons Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Tab Navigation */}
        <div className="bg-white shadow">
          <div className="container mx-auto">
            <div className="flex">
              <button className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'lessons' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500 hover:text-pink-600'}`} onClick={() => setActiveTab('lessons')}>
                Lessons
              </button>
              <button className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'practice' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500 hover:text-pink-600'}`} onClick={() => setActiveTab('practice')}>
                Practice
              </button>
              <button className={`px-6 py-4 font-medium text-sm focus:outline-none ${activeTab === 'videos' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-500 hover:text-pink-600'}`} onClick={() => setActiveTab('videos')}>
                Videos
              </button>
            </div>
          </div>
        </div>
        {/* Lessons Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {activeTab === 'lessons' && <>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  Sign Language Lessons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lessons.map(lesson => <div key={lesson.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-bold text-gray-800">
                            {lesson.title}
                          </h3>
                          {lesson.completed && <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              Completed
                            </div>}
                        </div>
                        <p className="text-gray-600 mb-4">
                          {lesson.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            <ClockIcon className="w-4 h-4 inline mr-1" />
                            {lesson.duration}
                          </span>
                          <Link to={`/isl/lesson/${lesson.id}`} className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                            {lesson.completed ? 'Review Lesson' : 'Start Lesson'}
                          </Link>
                        </div>
                      </div>
                    </div>)}
                </div>
              </>}
            {activeTab === 'practice' && <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <HandMetalIcon className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">
                  Interactive Practice
                </h3>
                <p className="text-gray-600 mb-4">
                  Practice your sign language skills with our interactive tools
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Complete more lessons to unlock practice activities
                </p>
                <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>}
            {activeTab === 'videos' && <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <BookOpenIcon className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Video Library</h3>
                <p className="text-gray-600 mb-4">
                  Watch educational videos demonstrating Indian Sign Language
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Complete more lessons to unlock video content
                </p>
                <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>}
          </div>
        </section>
        {/* Next Steps */}
        <section className="bg-pink-100 py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Recommended Next Steps
            </h2>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="bg-pink-500 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                  <StarIcon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-grow text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800">
                    Continue Learning
                  </h3>
                  <p className="text-gray-600">
                    Pick up where you left off with "Alphabet K-T"
                  </p>
                </div>
                <Link to="/isl/lesson/3" className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-6 rounded-lg text-sm font-medium transition-colors">
                  Start Lesson
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
}