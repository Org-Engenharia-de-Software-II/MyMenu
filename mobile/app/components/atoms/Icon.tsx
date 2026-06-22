import {
  ArrowLeft,
  BookOpen,
  Check,
  ChefHat,
  ChevronRight,
  ClipboardList,
  Clock3,
  Drumstick,
  Eye,
  Filter,
  Home,
  Plus,
  Refrigerator,
  Search,
  ShieldQuestion,
  Trash2,
  User,
  Utensils,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react-native';

type IconName =
  | 'home'
  | 'menu'
  | 'profile'
  | 'fridge'
  | 'plus'
  | 'search'
  | 'book'
  | 'utensils'
  | 'clock'
  | 'difficulty'
  | 'check'
  | 'meat'
  | 'chef'
  | 'trash'
  | 'back'
  | 'filter'
  | 'list'
  | 'eye'
  | 'arrowRight'
  | 'calendar';

type IconProps = LucideProps & {
  name: IconName;
};

const iconMap: Record<IconName, LucideIcon> = {
  home: Home,
  menu: BookOpen,
  profile: User,
  fridge: Refrigerator,
  plus: Plus,
  search: Search,
  book: BookOpen,
  utensils: Utensils,
  clock: Clock3,
  difficulty: ShieldQuestion,
  check: Check,
  meat: Drumstick,
  chef: ChefHat,
  trash: Trash2,
  back: ArrowLeft,
  filter: Filter,
  list: ClipboardList,
  eye: Eye,
  arrowRight: ChevronRight,
  calendar: ChevronRight, // You can replace this with an actual calendar icon if available
};

export function Icon({ name, ...props }: IconProps) {
  const Component = iconMap[name];
  return <Component {...props} />;
}
