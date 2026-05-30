import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, AlertCircle, ArrowRight, Search } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useOrders } from '@/contexts/OrderContext';
import { whatsappLink, formatPrice, generateOrderNumber, generateWhatsAppMessage, kuwaitGovernorates, getAreasByGovernorate, getAreaById, type KuwaitArea } from '@/data';
import Layout from '@/components/Layout';