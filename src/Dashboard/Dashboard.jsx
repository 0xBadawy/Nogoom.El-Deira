import React from 'react'
import Card from './Card'
import { FaBox, FaCog, FaShoppingCart, FaUsers } from 'react-icons/fa'
import { dataLine, dataBar } from '../assets/chartData'
import {Line, Bar} from 'react-chartjs-2'
import {Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement} from 'chart.js'
import { Outlet } from 'react-router-dom'
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement)

const Dashboard = () => {
  return (
    <div className="grow p-8">
      <Outlet />
    </div>
  );
}

export default Dashboard