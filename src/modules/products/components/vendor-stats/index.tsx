import { Star } from "lucide-react"

interface VendorStatsProps {
  product: {
    seller?: {
      name: string;
      location: string;
      rating: number;
      totalSales: number;
    }
  }
}

const VendorStats = ({ product }: VendorStatsProps) => {
  // Fallback data if seller info is not available
  const seller = product.seller || {
    name: 'Verified Seller',
    location: 'Morocco',
    rating: 4.8,
    totalSales: 50
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">About the Creator</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-900">{seller.name}</h4>
          <p className="text-gray-600">{seller.location}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{seller.rating}</span>
          </div>
          <span className="text-sm text-gray-500">{seller.totalSales} sales</span>
        </div>
        <button className="text-gray-900 font-medium hover:underline">
          Visit Creator Store
        </button>
      </div>
    </div>
  )
}

export default VendorStats