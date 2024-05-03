
import clsx from 'clsx'
import { toAbsoluteUrl } from '../../../_metronic/helpers'

type Props = {
  className?: string
  bgColor?: string
  title?: string
  title2?: string
}
const NoProdect = ({
  className,
  bgColor = '#000',
  title = 'Create SaaS',
  title2 = 'Based Reports',
}: Props) => {
  return (
    <div
      className={clsx(' container card h-175px bgi-no-repeat bgi-size-contain', className)}
      style={{
        backgroundColor: bgColor,
        backgroundPosition: 'right',
        backgroundImage: `url("${toAbsoluteUrl('media/svg/misc/taieri.svg')}")`,
      }}
    >
      <div className='card-body d-flex flex-column justify-content-between'>
        <h2 className='text-white fw-bold mb-5'>
          No Prodect Selected
        </h2>

        <div className='m-0'>
          <a
            href='#'
            className='btn btn-dark fw-semibold px-6 py-3'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
          >
           Create Order 
          </a>
        </div>
      </div>
    </div>
  )
}

export {NoProdect}
