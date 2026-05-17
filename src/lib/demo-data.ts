import type {
  CallOutcomeSummary,
  CallReport,
  CustomerInventoryItem,
  InventoryItem,
  Profile,
  SupplierOffer,
  UserRole,
} from '@/types'
import type { User } from '@supabase/supabase-js'

const DEMO_SESSION_KEY = 'vendor-wrangler.demo-session'
const DEMO_REPORTS_KEY = 'vendor-wrangler.demo-reports'

interface DemoSession {
  id: string
  email: string
  role: Exclude<UserRole, 'admin'>
  companyName: string
  phoneNumber: string | null
  teamSize?: string
  mainUseCase?: string
}

interface DemoSessionInput {
  email: string
  role: Exclude<UserRole, 'admin'>
  companyName: string
  phoneNumber?: string | null
  teamSize?: string
  mainUseCase?: string
}

export function shouldUseDemoMode(): boolean {
  if (typeof window === 'undefined') return false
  return process.env.NEXT_PUBLIC_USE_REAL_AUTH !== 'true' || Boolean(window.localStorage.getItem(DEMO_SESSION_KEY))
}

export function createDemoSession(input: DemoSessionInput): DemoSession {
  const session: DemoSession = {
    id: `demo-${Date.now()}`,
    email: input.email,
    role: input.role,
    companyName: input.companyName || (input.role === 'supplier' ? 'Demo Supplier Co' : 'Demo Customer Co'),
    phoneNumber: input.phoneNumber || null,
    teamSize: input.teamSize,
    mainUseCase: input.mainUseCase,
  }

  window.localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session))
  return session
}

export function getDemoSession(): DemoSession | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(DEMO_SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as DemoSession
  } catch {
    window.localStorage.removeItem(DEMO_SESSION_KEY)
    return null
  }
}

export function clearDemoSession(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(DEMO_SESSION_KEY)
}

export function getDemoUser(): User {
  const session = getDemoSession()
  return {
    id: session?.id ?? 'demo-user',
    email: session?.email ?? 'demo@vendorwrangler.app',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  } as User
}

export function getDemoProfile(): Profile {
  const session = getDemoSession()
  return {
    id: session?.id ?? 'demo-user',
    role: session?.role ?? 'customer',
    companyName: session?.companyName ?? 'Demo Company',
    phoneNumber: session?.phoneNumber ?? '+65 6123 4567',
  }
}

export function getDemoCustomerInventory(): CustomerInventoryItem[] {
  const now = new Date().toISOString()
  return [
    {
      id: 'cust-inv-paper',
      companyId: 'demo-company',
      itemName: 'A4 Copy Paper (Ream)',
      sku: 'PAP-A4-500',
      category: 'Stationery',
      currentQuantity: 6,
      restockThreshold: 15,
      supplierId: 'demo-supplier',
      supplierName: 'BDN Supplier',
      supplierPhone: '+65 6123 4567',
      unitCost: 8.9,
      updatedAt: now,
      createdAt: now,
    },
    {
      id: 'cust-inv-pens',
      companyId: 'demo-company',
      itemName: 'Blue Ballpoint Pens (Box/50)',
      sku: 'PEN-BB-050',
      category: 'Stationery',
      currentQuantity: 4,
      restockThreshold: 20,
      supplierId: 'demo-supplier',
      supplierName: 'BDN Supplier',
      supplierPhone: '+65 6123 4567',
      unitCost: 12.5,
      updatedAt: now,
      createdAt: now,
    },
    {
      id: 'cust-inv-toner',
      companyId: 'demo-company',
      itemName: 'Printer Toner Cartridge',
      sku: 'TON-HP-410',
      category: 'Office supplies',
      currentQuantity: 8,
      restockThreshold: 5,
      supplierId: 'demo-supplier',
      supplierName: 'BDN Supplier',
      supplierPhone: '+65 6123 4567',
      unitCost: 86,
      updatedAt: now,
      createdAt: now,
    },
  ]
}

export function getDemoSupplierInventory(): InventoryItem[] {
  const now = new Date().toISOString()
  return [
    {
      id: 'sup-inv-paper',
      supplierId: 'demo-supplier',
      itemName: 'A4 Copy Paper (Ream)',
      sku: 'PAP-A4-500',
      category: 'Stationery',
      quantity: 240,
      unitPrice: 8.9,
      description: 'Everyday office paper for printers and copiers',
      minStockAlert: 50,
      updatedAt: now,
      createdAt: now,
    },
    {
      id: 'sup-inv-pens',
      supplierId: 'demo-supplier',
      itemName: 'Blue Ballpoint Pens (Box/50)',
      sku: 'PEN-BB-050',
      category: 'Stationery',
      quantity: 180,
      unitPrice: 12.5,
      description: 'Box of blue ballpoint pens for offices',
      minStockAlert: 40,
      updatedAt: now,
      createdAt: now,
    },
    {
      id: 'sup-inv-toner',
      supplierId: 'demo-supplier',
      itemName: 'Printer Toner Cartridge',
      sku: 'TON-HP-410',
      category: 'Office supplies',
      quantity: 35,
      unitPrice: 86,
      description: 'Replacement toner for office printers',
      minStockAlert: 10,
      updatedAt: now,
      createdAt: now,
    },
  ]
}

export function getDemoOffers(): SupplierOffer[] {
  return [
    {
      id: 'offer-stationery',
      supplierId: 'demo-supplier',
      supplierName: 'BDN Supplier',
      title: 'Office restock bundle available this week',
      content: 'A4 paper, pens, and toner are ready for consolidated delivery. Best for teams restocking before month-end admin cycles.',
      items: getDemoSupplierInventory(),
      status: 'active',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
  ]
}

function baseDemoReport(): CallReport {
  const outcome: CallOutcomeSummary = {
    vendorName: 'BDN Supplier',
    resolutionStatus: 'Supplier confirmed availability, pricing, and next-day delivery for the requested office supplies.',
    paymentDate: null,
    confidenceScore: 0.92,
    nextStep: 'Mark as Resolved',
  }

  return {
    id: 'demo-report-1',
    userId: 'demo-user',
    supplierId: 'demo-supplier',
    naturalLanguageRequest: 'Call BDN Supplier to confirm A4 paper and blue pen availability for delivery tomorrow.',
    jobSpec: {
      vendor: 'BDN Supplier',
      objective: 'Confirm availability, pricing, and earliest delivery date for A4 paper and blue pens.',
      requiredQuestions: [
        'Do you have A4 copy paper and blue ballpoint pens available?',
        'What is the current unit pricing?',
        'Can delivery happen tomorrow before 12pm?',
      ],
      escalationGuardrails: ['Escalate if pricing changed by more than 15%', 'Escalate if delivery is later than this week'],
      echoMitigationPrompt: 'Ignore echoes and continue linearly.',
    },
    rawTranscript: 'Agent called BDN Supplier and confirmed stock, pricing, and next-day delivery.',
    cleanedTranscript: 'BDN Supplier confirmed 240 reams of A4 paper and 180 boxes of blue pens are available. Delivery can be made tomorrow before 12pm.',
    orderStatus: 'preparing',
    restockItems: [
      { inventoryItemId: 'cust-inv-paper', itemName: 'A4 Copy Paper (Ream)', unitsOrdered: 24 },
      { inventoryItemId: 'cust-inv-pens', itemName: 'Blue Ballpoint Pens (Box/50)', unitsOrdered: 36 },
    ],
    createdAt: new Date().toISOString(),
    ...outcome,
  }
}

export function getDemoReports(): CallReport[] {
  if (typeof window === 'undefined') return [baseDemoReport()]
  const raw = window.localStorage.getItem(DEMO_REPORTS_KEY)
  if (!raw) return [baseDemoReport()]

  try {
    return [...(JSON.parse(raw) as CallReport[]), baseDemoReport()]
  } catch {
    window.localStorage.removeItem(DEMO_REPORTS_KEY)
    return [baseDemoReport()]
  }
}

export function getDemoReportById(reportId: string): CallReport {
  const report = baseDemoReport()
  return {
    ...report,
    id: reportId,
  }
}

export function addDemoReport(naturalLanguageRequest: string, supplierId: string | null = 'demo-supplier'): CallReport {
  const report: CallReport = {
    ...baseDemoReport(),
    id: `demo-report-${Date.now()}`,
    supplierId,
    naturalLanguageRequest,
    createdAt: new Date().toISOString(),
  }

  const current = getDemoReports().filter(item => item.id !== 'demo-report-1')
  window.localStorage.setItem(DEMO_REPORTS_KEY, JSON.stringify([report, ...current]))
  return report
}

export function getDemoIncomingTickets(): Array<CallReport & { customerName: string | null }> {
  return getDemoReports().map(report => ({
    ...report,
    customerName: getDemoSession()?.companyName ?? 'Demo Customer Co',
  }))
}
