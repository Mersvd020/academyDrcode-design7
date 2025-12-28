import React from 'react'

const Links = () => {
  return (
    <div className="flex gap-16 cursor-pointer z-20">
          {[1, 2, 3].map((col) => (
            <div key={col}>
              <h3 className="font-semibold mb-4 text-lg">لینک ها</h3>
              <ul className="space-y-2 text-sm">
                <li className='hover:opacity-70'>دوره ها</li>
                <li className='hover:opacity-70'>اساتید برتر</li>
                <li className='hover:opacity-70'>خبرهای داغ</li>
                <li className='hover:opacity-70'>اساتید برتر</li>
              </ul>
            </div>
        ))}
      </div>
  )
}

export default Links